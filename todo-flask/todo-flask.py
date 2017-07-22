from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from migrate.versioning import api

from config import *

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), index=False, unique=False)
    description = db.Column(db.String(1000), index=False, unique=False)

    def __init__(self, name, description):
        self.name = name
        self.description = description
        #    global task_id_seq
        #    self.id = task_id_seq
        #    self.name = name
        #    self.description = description
        #    self.created_date = datetime.date.today()
        #    task_id_seq += 1


@app.route('/')
def index():
    name = ''
    try:
        name = request.args['name']
    except KeyError:
        pass
    ts = Task.query.filter(Task.name.ilike('%' + name + '%'))
    return render_template('index.html', tasks=ts)


@app.route('/view_task/<task_id>/')
def view_task(task_id):
    t = Task.query.get(task_id)
    return render_template('view_task.html', task=t)


@app.route('/close_task/<task_id>/')
def close_task(task_id):
    Task.query.filter(Task.id == int(task_id)).delete()
    db.session.commit()
    return redirect('/')


@app.route('/create_task/', methods=['POST'])
def create_task():
    name = request.form['name']
    description = request.form['description']
    t = Task(name, description)
    db.session.add(t)
    db.session.commit()
    return redirect('/')


@app.route('/edit_task/<task_id>/', methods=['GET', 'POST'])
def edit_task(task_id):
    t = Task.query.get(task_id)
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        t.name = name
        t.description = description
        db.session.commit()
        return redirect('/view_task/%d/' % t.id)
    else:
        return render_template('edit_task.html', task=t)


if __name__ == '__main__':
    # Set up initial database
    if not os.path.exists(SQLALCHEMY_MIGRATE_REPO):
        db.create_all()
        api.create(SQLALCHEMY_MIGRATE_REPO, 'database repository')
        api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
        t1 = Task('Work out', '...')
        t2 = Task('Clean apartment', '...')
        db.session.add(t1)
        db.session.add(t2)
        db.session.commit()

    app.run()
