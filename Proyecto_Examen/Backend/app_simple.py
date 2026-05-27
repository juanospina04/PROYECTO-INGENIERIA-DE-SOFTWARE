from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)

# CORS
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Almacenamiento
eventos = []
examenes_guardados = []

# Carpeta para guardar exámenes
CARPETA_EXAMENES = 'examenes_guardados'
if not os.path.exists(CARPETA_EXAMENES):
    os.makedirs(CARPETA_EXAMENES)
    print(f"📁 Carpeta creada: {CARPETA_EXAMENES}")

@app.route('/registrar_evento', methods=['POST', 'OPTIONS'])
def registrar_evento():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        datos = request.get_json(force=True)
        evento = {
            'id': len(eventos) + 1,
            'student_id': datos.get('student_id', 'DESCONOCIDO'),
            'tipo_evento': datos.get('tipo_evento', 'SIN_TIPO'),
            'timestamp': datos.get('timestamp', datetime.now().isoformat())
        }
        eventos.append(evento)
        print(f"\n✅ {evento['student_id']} - {evento['tipo_evento']}")
        return jsonify({'success': True, 'evento_id': evento['id']}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/guardar_examen', methods=['POST', 'OPTIONS'])
def guardar_examen():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        datos = request.get_json(force=True)
        
        # Calcular riesgo de fraude
        stats = datos.get('estadisticas_fraude', {})
        riesgo = 0
        riesgo += stats.get('contadorCambiosPestana', 0) * 15
        riesgo += stats.get('contadorPerdidaFoco', 0) * 10
        riesgo += stats.get('contadorMinimizacion', 0) * 20
        riesgo = min(riesgo, 100)
        
        examen = {
            'id': len(examenes_guardados) + 1,
            'student_id': datos.get('student_id'),
            'student_name': datos.get('student_name'),
            'respuestas': datos.get('respuestas'),
            'total_preguntas': datos.get('total_preguntas'),
            'riesgo_fraude': riesgo,
            'timestamp': datos.get('timestamp'),
            'fecha_guardado': datetime.now().isoformat()
        }
        
        examenes_guardados.append(examen)
        
        # Guardar en archivo JSON
        archivo = f"{CARPETA_EXAMENES}/examen_{datos.get('student_id')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(archivo, 'w', encoding='utf-8') as f:
            json.dump(examen, f, indent=4, ensure_ascii=False)
        
        print(f"\n📝 EXAMEN GUARDADO: {archivo}")
        print(f"Estudiante: {datos.get('student_name')}")
        print(f"Riesgo de fraude: {riesgo}%\n")
        
        return jsonify({
            'success': True,
            'examen_id': examen['id'],
            'archivo': archivo,
            'riesgo_fraude': riesgo,
            'message': 'Examen guardado correctamente'
        }), 200
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/examenes')
def ver_examenes():
    return jsonify({
        'total': len(examenes_guardados),
        'examenes': examenes_guardados
    })

@app.route('/')
def index():
    return jsonify({
        'servidor': 'Detector de Fraude',
        'eventos_registrados': len(eventos),
        'examenes_guardados': len(examenes_guardados),
        'estado': 'activo'
    })

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 SERVIDOR INICIADO")
    print("="*60)
    print(f"📍 Servidor: http://localhost:5000")
    print(f"📁 Archivos se guardan en: ./{CARPETA_EXAMENES}/")
    print("="*60 + "\n")
    app.run(host='0.0.0.0', port=5000, debug=True)