#!/bin/bash

# Script de despliegue del frontend CRM
# Este script instala dependencias y genera el build de producción

echo "🚀 Iniciando despliegue del frontend..."

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Generar build de producción
echo "🔨 Generando build de producción..."
npm run build

echo "✅ Build completado exitosamente!"
echo ""
echo "📝 Próximos pasos:"
echo "   1. El contenido de la carpeta 'dist/' debe copiarse o servirse en:"
echo "      /var/www/crm-frontend"
echo ""
echo "   2. En la VPS, puedes usar un servidor web (nginx, apache) para servir"
echo "      los archivos estáticos desde /var/www/crm-frontend"
echo ""
echo "   3. Asegúrate de configurar las variables de entorno (.env) con la"
echo "      URL correcta del backend Django antes de hacer el build"

