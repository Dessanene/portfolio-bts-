# Script pour appliquer la solution renforcée qui élimine complètement le flash blanc

# Obtenir tous les fichiers HTML du projet
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # 1. Remplacer le script de transition actuel par la solution renforcée
    if ($content -match '<script src="js/page-transitions.js"></script>') {
        $content = $content -replace '<script src="js/page-transitions.js"></script>', '<script src="js/no-flash-fix.js"></script>'
        $modified = $true
    } elseif ($content -match '<script src="../js/page-transitions.js"></script>') {
        $content = $content -replace '<script src="../js/page-transitions.js"></script>', '<script src="../js/no-flash-fix.js"></script>'
        $modified = $true
    }
    
    # 2. Ajouter une balise style prioritaire en haut de la page pour forcer le fond noir
    if ($content -notmatch '<style id="no-flash-fix">') {
        $styleTag = @"
    <!-- Solution anti-flash prioritaire -->
    <style id="no-flash-fix">
        html, body {
            background-color: #121212 !important;
            transition: none !important;
        }
    </style>

"@
        # Insérer juste après la balise head
        if ($content -match '<head>') {
            $content = $content -replace '<head>', "<head>`n$styleTag"
            $modified = $true
        }
    }
    
    # 3. Ajouter un script en ligne prioritaire pour garantir que le fond reste noir
    if ($content -notmatch '<script id="no-flash-inline">') {
        $scriptTag = @"
    <!-- Script prioritaire pour empêcher le flash -->
    <script id="no-flash-inline">
        document.documentElement.style.backgroundColor = '#121212';
        document.addEventListener('DOMContentLoaded', function() {
            document.body.style.backgroundColor = '#121212';
        });
    </script>

"@
        # Insérer juste avant la fermeture de la balise head
        if ($content -match '</head>') {
            $content = $content -replace '</head>', "$scriptTag</head>"
            $modified = $true
        }
    }
    
    # Sauvegarder les modifications
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Solution anti-flash renforcée appliquée à $($file.Name)"
    } else {
        Write-Host "$($file.Name) déjà à jour ou structure non standard"
    }
}

Write-Host "Application de la solution anti-flash renforcée terminée !"
