from flask import Flask, render_template
import yaml
from pathlib import Path

app = Flask(__name__)

EXERCISES_DIR = Path('data/')

def load_data(seccion, filename):
    with open(EXERCISES_DIR / seccion / filename, encoding='utf-8') as f:
        return yaml.safe_load(f)
    
def get_all_exercises(seccion):
    files = ["entender.yml", "diagnosticar.yml", "construir.yml"]
    all_exercises = []

    for file in files:
        data = load_data(seccion, file)
        all_exercises.extend(data)

    return all_exercises

@app.route("/")
def index(): 
    return render_template('index.html')

@app.route("/condicionales")
def condicionales():
    return render_template('condicionales.html',
                           topics=load_data('condicionales', 'condicionales.yml'),
                           exercises=get_all_exercises('condicionales'))

@app.route("/ciclos")
def ciclos():
    return 'Ciclos'

@app.route("/arrays")
def arrays():
    return 'Arrays'

@app.route("/matrinces")
def matrices():
    return 'Matrices'

@app.route("/funciones")
def funciones():
    return 'Funciones'

@app.route("/strings")
def strings():
    return 'Strings'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)