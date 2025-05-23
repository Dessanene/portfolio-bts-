# Script pour retirer les effets modernes tout en gardant la correction du flash blanc

# Obtenir tous les fichiers HTML du projet
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # 1. Retirer la feuille de style des effets modernes
    if ($content -match '<link rel="stylesheet" href="css/modern-card-effects.css">') {
        $content = $content -replace '<link rel="stylesheet" href="css/modern-card-effects.css">\r?\n?', ''
        $modified = $true
    } elseif ($content -match '<link rel="stylesheet" href="../css/modern-card-effects.css">') {
        $content = $content -replace '<link rel="stylesheet" href="../css/modern-card-effects.css">\r?\n?', ''
        $modified = $true
    }
    
    # 2. Revenir au script de transition original, mais en gardant les améliorations pour le flash blanc
    if ($content -match '<script src="js/improved-transitions.js"></script>') {
        $content = $content -replace '<script src="js/improved-transitions.js"></script>', '<script src="js/page-transitions.js"></script>'
        $modified = $true
    } elseif ($content -match '<script src="../js/improved-transitions.js"></script>') {
        $content = $content -replace '<script src="../js/improved-transitions.js"></script>', '<script src="../js/page-transitions.js"></script>'
        $modified = $true
    }
    
    # 3. Conserver uniquement le style de fond noir pour éviter le flash, mais retirer les styles d'animation
    if ($content -match 'body, html \{ background-color: #121212; \}') {
        $content = $content -replace '    <style>\r?\n        body, html \{ background-color: #121212; \}\r?\n        .page-transition \{\r?\n            position: fixed;\r?\n            top: 0;\r?\n            left: 0;\r?\n            width: 100%;\r?\n            height: 100%;\r?\n            background-color: #121212;\r?\n            z-index: 9999;\r?\n            transform: translateX\(100%\);\r?\n            transition: transform 0.4s ease-in-out;\r?\n        \}\r?\n    </style>\r?\n', '    <style>
        body, html { background-color: #121212; }
    </style>
'
        $modified = $true
    }
    
    # Sauvegarder les modifications
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Effets modernes retirés de $($file.Name)"
    } else {
        Write-Host "$($file.Name) déjà à jour ou structure non standard"
    }
}

# Créer un script page-transitions.js minimal qui force le fond noir sans animations
$transitionScript = @"
// Script de transition minimal - Force le fond noir sans animations
document.addEventListener('DOMContentLoaded', function() {
    // Force le fond noir
    document.body.style.backgroundColor = '#121212';
    document.documentElement.style.backgroundColor = '#121212';
    
    // Masquer le préchargeur après chargement
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
    
    // Force le fond noir pendant les transitions
    function forceBackgroundColor() {
        document.body.style.backgroundColor = '#121212';
        document.documentElement.style.backgroundColor = '#121212';
    }
    
    // Appliquer un intervalle pour s'assurer que le fond reste noir
    setInterval(forceBackgroundColor, 100);
    
    // S'assurer que le fond reste noir pendant la navigation
    window.addEventListener('beforeunload', function() {
        document.body.style.backgroundColor = '#121212';
        document.documentElement.style.backgroundColor = '#121212';
    });
});
"@

# Écrire le script minimal de transition
Set-Content -Path "js/page-transitions.js" -Value $transitionScript
Write-Host "Script de transition simplifié créé"

Write-Host "Suppression des effets modernes terminée, tout en conservant la correction du flash blanc !"
