# Script pour corriger les problèmes d'écran noir dans toutes les pages HTML
# Créé le 23/05/2025

Write-Host "Correction des problèmes d'écran noir dans le portfolio..."

# Correction du style qui force le fond noir
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse -File

foreach ($file in $htmlFiles) {
    Write-Host "Traitement du fichier: $($file.FullName)"
    
    # Lecture du contenu du fichier
    $content = Get-Content -Path $file.FullName -Raw
    
    # Correction 1: Remplacer le style no-flash-fix forcé
    $content = $content -replace '(<!-- Solution anti-flash prioritaire -->[\r\n\s]+<style id="no-flash-fix">[\r\n\s]+html, body \{[\r\n\s]+background-color: #121212 !important;[\r\n\s]+transition: none !important;[\r\n\s]+\}[\r\n\s]+</style>)', '<!-- Solution anti-flash améliorée -->
    <style id="no-flash-fix">
        html, body {
            background-color: #121212;
            transition: background-color 0.3s ease;
        }
    </style>'
    
    # Correction 2: Remplacer les scripts qui forcent le fond noir
    $content = $content -replace '(document\.documentElement\.style\.backgroundColor = ''#121212'';[\r\n\s]+document\.addEventListener\(''DOMContentLoaded'', function\(\) \{[\r\n\s]+document\.body\.style\.backgroundColor = ''#121212'';[\r\n\s]+\}\);)', 'document.documentElement.style.backgroundColor = ''#121212'';
        document.addEventListener(''DOMContentLoaded'', function() {
            // Assurer que le contenu sera visible après chargement
            setTimeout(function() {
                document.body.style.visibility = ''visible'';
            }, 100);
        });'
    
    # Écriture du contenu modifié dans le fichier
    Set-Content -Path $file.FullName -Value $content
}

Write-Host "Terminé! Tous les fichiers HTML ont été corrigés."
