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
    return render_template('index.html', titulo='Inicio')

@app.route("/condicionales")
def condicionales():
    return render_template('condicionales.html',
                           topics=load_data('condicionales', 'condicionales.yml'),
                           exercises=get_all_exercises('condicionales'),
                           titulo='Condicionales')

@app.route("/ciclos")
def ciclos():
    return render_template('ciclos.html',
                           topics=load_data('ciclos', 'ciclos.yml'),
                           exercises=get_all_exercises('ciclos'),
                           titulo='Ciclos')

@app.route("/arrays")
def arrays():
    return render_template('arrays.html',
                           topics=load_data('arrays', 'arrays.yml'),
                           exercises=get_all_exercises('arrays'),
                           titulo='Arrays')

@app.route("/matrinces")
def matrices():
    return render_template('matrices.html',
                           topics=load_data('matrices', 'matrices.yml'),
                           exercises=get_all_exercises('matrices'),
                           titulo='Matrices')

@app.route("/funciones")
def funciones():
    return render_template('funciones.html',
                           topics=load_data('funciones', 'funciones.yml'),
                           exercises=get_all_exercises('funciones'),
                           titulo='Funciones')

@app.route("/strings")
def strings():
    return render_template('strings.html',
                           topics=load_data('strings', 'strings.yml'),
                           exercises=get_all_exercises('strings'),
                           titulo='Strings')

@app.route("/antes_de_comenzar")
def antes_de_comenzar():
    return render_template("antes_de_comenzar.html")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)