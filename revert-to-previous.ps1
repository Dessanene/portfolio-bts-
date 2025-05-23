# Script pour revenir à la solution précédente de correction du flash blanc

# Obtenir tous les fichiers HTML du projet
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # 1. Revenir au script de transition original
    if ($content -match '<script src="js/no-flash-fix.js"></script>') {
        $content = $content -replace '<script src="js/no-flash-fix.js"></script>', '<script src="js/page-transitions.js"></script>'
        $modified = $true
    } elseif ($content -match '<script src="../js/no-flash-fix.js"></script>') {
        $content = $content -replace '<script src="../js/no-flash-fix.js"></script>', '<script src="../js/page-transitions.js"></script>'
        $modified = $true
    }
    
    # 2. Supprimer la balise style prioritaire
    if ($content -match '<style id="no-flash-fix">') {
        $content = $content -replace '    <!-- Solution anti-flash prioritaire -->\r?\n    <style id="no-flash-fix">\r?\n        html, body \{\r?\n            background-color: #121212 !important;\r?\n            transition: none !important;\r?\n        \}\r?\n    </style>\r?\n\r?\n', ''
        $modified = $true
    }
    
    # 3. Supprimer le script en ligne prioritaire
    if ($content -match '<script id="no-flash-inline">') {
        $content = $content -replace '    <!-- Script prioritaire pour empêcher le flash -->\r?\n    <script id="no-flash-inline">\r?\n        document.documentElement.style.backgroundColor = \'#121212\';\r?\n        document.addEventListener\(\'DOMContentLoaded\', function\(\) \{\r?\n            document.body.style.backgroundColor = \'#121212\';\r?\n        \}\);\r?\n    </script>\r?\n\r?\n', ''
        $modified = $true
    }
    
    # Sauvegarder les modifications
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Retour à la solution précédente pour $($file.Name)"
    } else {
        Write-Host "$($file.Name) déjà à jour ou structure non standard"
    }
}

# Recréer le fichier page-transitions.js avec la solution simple
$transitionScript = @"
// Script de transition simple - Correction du flash blanc
document.addEventListener('DOMContentLoaded', function() {
    // Force le fond noir
    document.body.style.backgroundColor = '#121212';
    document.documentElement.style.backgroundColor = '#121212';
    
    // Préchargeur: Masquer après le chargement complet
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }
    
    // S'assurer que le fond reste noir
    window.addEventListener('beforeunload', function() {
        document.body.style.backgroundColor = '#121212';
        document.documentElement.style.backgroundColor = '#121212';
    });
});
"@

# Écrire le script simple de transition
Set-Content -Path "js/page-transitions.js" -Value $transitionScript
Write-Host "Script de transition simple recréé"

Write-Host "Retour à la solution précédente terminé !"
