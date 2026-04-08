# **Proyecto de clase.**
## Ingenieria de Software I SC

---

## **Información General**

- **Nombre de los estudiantes**:  
  Juan Camilo Rodríguez Angulo, Juan Esteban Ospina Martinez, Andres Santiago Rojas Zuñiga, Andres Felipe Rodriguez Gonzalez.

- **Curso / Grupo**:  
  SC (Ingenieria de Software I)

- **Fecha de entrega**:  
  23/02/2026

- **Profesor**:  
  

---

## **Título del Proyecto**

### “Monitoreo Digital de evaluaciones”.

---

# Desarrollo de un sistema de examen en línea con detección de cambio de pestaña

## 1 Introducción

### 1.1 Propósito

El presente documento tiene como propósito especificar de manera detallada los requisitos del sistema de monitoreo digital orientado a la detección de cambios de pestaña durante evaluaciones virtuales. Este documento está dirigido a desarrolladores, docentes, evaluadores académicos y demás interesados en el diseño, desarrollo e implementación del sistema.
Su objetivo es servir como base para la comprensión funcional del sistema, así como para la validación de sus características y comportamiento esperado.

### 1.2 Alcance

El sistema consiste en una aplicación web capaz de detectar cambios de pestaña, pérdida de foco o minimización de la ventana durante una evaluación virtual. Su finalidad es apoyar los procesos de supervisión académica mediante el registro de eventos y la generación de reportes.
El sistema permitirá:
- Detectar eventos de cambio de pestaña en tiempo real.
- Registrar fecha y hora de cada evento.
- Generar advertencias progresivas al usuario.
- Mostrar un contador visible de incidencias.
- Almacenar los datos en un servidor.
- Generar reportes para el docente.
El sistema no bloqueará directamente al usuario, sino que actuará como una herramienta de monitoreo y análisis.
---

## Descripción del proyecto

El presente proyecto consiste en el desarrollo de un sistema web de exámenes en línea capaz de detectar cuando un estudiante cambia de pestaña o abandona la ventana activa durante una evaluación. El sistema registrará estos eventos y generará información que posteriormente podrá ser revisada por el docente.

La propuesta se enfoca en aplicar los conocimientos adquiridos en la materia de Ingeniería de Software, abarcando etapas como análisis de requisitos, diseño del sistema, desarrollo e implementación básica. Se busca crear una solución funcional y sencilla que aporte mayor control en evaluaciones virtuales sin recurrir a métodos invasivos como el uso de cámaras o monitoreo externo del equipo.
## Planteamiento del problema

Uno de los mayores problemas de los exámenes virtuales es la dificultad para supervisar a los estudiantes. En un examen presencial el docente puede observar el comportamiento del grupo, pero en línea esto no ocurre, ya que el estudiante puede abrir otras páginas, buscar respuestas o utilizar diferentes recursos sin que el profesor lo note.

Esto provoca que los resultados de las evaluaciones no siempre reflejen el conocimiento real del estudiante. Por esta razón, surge la necesidad de crear herramientas tecnológicas que permitan detectar comportamientos que puedan indicar posibles irregularidades durante un examen.

---

## Justificación

El desarrollo de este sistema es importante porque busca mejorar la confiabilidad de las evaluaciones virtuales sin necesidad de usar herramientas complejas o invasivas. Detectar cambios de pestaña no evita completamente el fraude, pero sí permite generar alertas y registros que ayudan al docente a analizar lo ocurrido durante el examen.

Además, este proyecto permite aplicar de manera práctica los conceptos aprendidos en Ingeniería de Software, como el levantamiento de requisitos, diseño del sistema, organización del desarrollo y pruebas del producto.

---

## Público objetivo

El sistema está pensado para:

- Docentes que realizan evaluaciones virtuales.
- Instituciones educativas que usan plataformas en línea.
- Estudiantes que presentan exámenes digitales.
- Administradores académicos que necesitan seguimiento de evaluaciones.

---

## Objetivo general

Desarrollar un sistema web de exámenes en línea que detecte y registre cuando un estudiante cambia de pestaña durante la evaluación, con el fin de mejorar el control y seguimiento del proceso evaluativo.

---

## Objetivos específicos

- Identificar los requisitos necesarios para el funcionamiento del sistema.
- Diseñar una interfaz sencilla para docentes y estudiantes.
- Implementar la detección de cambio de pestaña usando funciones del navegador.
- Guardar los registros de actividad en una base de datos.
- Generar reportes que puedan ser revisados por el docente.
- Realizar pruebas básicas para verificar el correcto funcionamiento del sistema.

---

## Alcance

El sistema permitirá crear exámenes en línea, responder preguntas dentro de una plataforma web y registrar cuando el estudiante cambie de pestaña o minimice la ventana.

El proyecto no incluye reconocimiento facial, grabación por cámara ni monitoreo externo del computador, ya que el enfoque está únicamente en el comportamiento dentro del navegador.

---

## Marco técnico (criterios de clasificación)

El proyecto se clasifica como una aplicación web educativa basada en el modelo cliente-servidor.

Características técnicas principales:

- Aplicación web accesible desde navegador.
- Frontend desarrollado con Python y JavaScript.
- Backend encargado de procesar datos y almacenar información.
- Base de datos para guardar usuarios, exámenes y registros.
- Sistema multiusuario con inicio de sesión.

---

## Metodología de desarrollo

Para el desarrollo se propone utilizar una metodología ágil tipo Scrum, ya que permite dividir el trabajo en pequeñas partes y avanzar progresivamente.

El proceso se organizará en etapas:

1. Análisis de requisitos.
2. Diseño inicial del sistema.
3. Desarrollo por módulos.
4. Pruebas y correcciones.
5. Entrega final del sistema.

Esto facilita que el equipo pueda adaptarse a cambios y mejorar el sistema durante el proceso.

---

## Arquitectura del sistema

El sistema tendrá una arquitectura básica de tres capas:

- **Frontend:** interfaz donde el estudiante presenta el examen.
- **Backend:** procesa la información y controla la lógica del sistema.
- **Base de datos:** almacena preguntas, respuestas y registros de actividad.

La detección del cambio de pestaña se realizará mediante eventos del navegador que permiten saber cuándo la página deja de estar activa.

---

## Indicadores y métricas

Para evaluar el funcionamiento del sistema se tendrán en cuenta:

- Cantidad de cambios de pestaña detectados por estudiante.
- Tiempo total del examen.
- Correcto registro de eventos en la base de datos.
- Tiempo de respuesta del sistema.
- Opinión de los usuarios durante pruebas piloto.

---

## Resultados y beneficios esperados

Se espera que el sistema ayude a mejorar el control en evaluaciones virtuales y brinde a los docentes información adicional sobre el comportamiento del estudiante durante el examen.

Además, el proyecto permitirá al equipo aplicar conocimientos reales de Ingeniería de Software y comprender mejor el proceso completo de desarrollo de un sistema, desde la idea inicial hasta su implementación.

En general, se busca demostrar que con herramientas web básicas es posible crear soluciones útiles para problemas actuales dentro de la educación digital.

---

Citas Bibliograficas:
