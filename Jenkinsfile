pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my_app_image'  // Nombre de la imagen local
        COMPOSE_FILE = 'docker-compose.yml'  // Archivo docker-compose
    }

    stages {
        stage('Clonar código') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/JordanR17/CRUD-CUSTOMERS.git',
                        credentialsId: 'b4489ade-c5e3-4c09-b315-ba3821d269e9'  
                    ]]
                ])
            }
        }

        stage('Verificar cambios en el código') {
            steps {
                script {
                    def changes = sh(script: 'git diff --quiet HEAD~1 HEAD || echo "changes"', returnStdout: true).trim()
                    if (changes == "changes") {
                        env.BUILD_IMAGE = "true"
                    } else {
                        env.BUILD_IMAGE = "false"
                    }
                }
            }
        }

        stage('Construir imagen de la aplicación (Si hay cambios)') {
            when {
                expression { env.BUILD_IMAGE == "true" }
            }
            steps {
                script {
                    sh 'docker build -t $IMAGE_NAME .'  // Construye la imagen si hay cambios
                }
            }
        }

        stage('Levantar aplicación con Docker Compose') {
            steps {
                script {
                    sh 'docker compose down || true'  // Baja los contenedores anteriores (ignora errores)
                    sh 'docker compose up -d'  // Usa la imagen existente sin reconstruir
                }
            }
        }

        stage('Verificar ejecución') {
            steps {
                script {
                    sh 'docker ps'  // Muestra los contenedores corriendo
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Despliegue exitoso"
        }
        failure {
            echo "❌ Hubo un error en el pipeline"
        }
    }
}
