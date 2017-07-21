from flask import Flask, render_template
import datetime

app = Flask(__name__)

tasks = []


class Task:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.created_date = datetime.date.today()


@app.route('/')
def index():
    return render_template('index.html', tasks = tasks)


if __name__ == '__main__':
    tasks += [Task('Work out', '...')]
    tasks += [Task('Buy food', '...')]
    app.run()
