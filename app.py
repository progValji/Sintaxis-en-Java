from flask import Flask, render_template
import yaml

app = Flask(__name__)

def load_data(filename):
    with open(f'static/data/{filename}.yml', encoding='utf-8') as f:
        return yaml.safe_load(f)

@app.route("/")
def index(): 
    return render_template('index.html')

@app.route("/condicionales")
def condicionales():
    return render_template('condicionales.html', topics=load_data('condicionales'))

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