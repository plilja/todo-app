import datetime

from flask import Flask, render_template, request, redirect

app = Flask(__name__)

tasks = []

task_id_seq = 1


class Task:
    def __init__(self, name, description):
        global task_id_seq
        self.id = task_id_seq
        self.name = name
        self.description = description
        self.created_date = datetime.date.today()
        task_id_seq += 1


@app.route('/')
def index():
    name = ''
    try:
        name = request.args['name']
    except KeyError:
        pass
    ts = list(filter(lambda t: name.lower() in t.name.lower(), tasks))
    return render_template('index.html', tasks=ts)


@app.route('/view_task/<task_id>/')
def view_task(task_id):
    t = list(filter(lambda t: t.id == int(task_id), tasks))[0]
    return render_template('view_task.html', task=t)


@app.route('/close_task/<task_id>/')
def close_task(task_id):
    t = list(filter(lambda t: t.id == int(task_id), tasks))[0]
    tasks.remove(t)
    return redirect('/')


@app.route('/create_task/', methods=['POST'])
def create_task():
    name = request.form['name']
    description = request.form['description']
    tasks.append(Task(name, description))
    return redirect('/')


@app.route('/edit_task/<task_id>/', methods=['GET', 'POST'])
def edit_task(task_id):
    t = list(filter(lambda t: t.id == int(task_id), tasks))[0]
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        t.name = name
        t.description = description
        return redirect('/view_task/%d/' % t.id)
    else:
        return render_template('edit_task.html', task=t)


if __name__ == '__main__':
    tasks += [Task('Work out', '...')]
    tasks += [Task('Buy food', '...')]
    app.run()
