import datetime

from flask import Flask, render_template, request, redirect

app = Flask(__name__)

tasks = []


class Task:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.created_date = datetime.date.today()


@app.route('/')
def index():
    name = ''
    try:
        name = request.args['name']
    except KeyError:
        pass
    ts = list(filter(lambda t: name.lower() in t.name.lower(), tasks))
    return render_template('index.html', tasks=ts)


@app.route('/create_task/', methods=['POST'])
def create_task():
    name = request.form['name']
    description = request.form['description']
    tasks.append(Task(name, description))
    return redirect('/')


if __name__ == '__main__':
    tasks += [Task('Work out', '...')]
    tasks += [Task('Buy food', '...')]
    app.run()
