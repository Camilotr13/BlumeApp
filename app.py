from flask import Flask, render_template, send_from_directory, redirect, url_for
import os

app = Flask(__name__)

# Ruta para servir archivos estáticos
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# Ruta principal que redirige al login
@app.route('/')
def index():
    return redirect(url_for('login'))

# Ruta para el login
@app.route('/login')
def login():
    return render_template('login.html')

# Ruta para el panel de estudiante
@app.route('/estudiante')
def estudiante():
    return render_template('estudiante/estudiante.html')

# Ruta para el panel de administrador
@app.route('/admin')
def admin():
    return render_template('admin/AdminPanel.html')

# Ruta para el panel de empresa
@app.route('/empresa')
def empresa():
    return render_template('empresaPanel/EmpresaCompany.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
