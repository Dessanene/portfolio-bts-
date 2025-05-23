# Script pour appliquer les effets modernes et les transitions améliorées à toutes les pages HTML

# Obtenir tous les fichiers HTML du projet
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # 1. Ajouter la feuille de style des effets modernes si elle n'existe pas déjà
    if ($content -notmatch '<link rel="stylesheet" href="css/modern-card-effects.css">') {
        if ($content -match '<link rel="stylesheet" href="css/style.css">') {
            # Si la page est à la racine
            $content = $content -replace '(<link rel="stylesheet" href="css/style.css">)', '$1
    <link rel="stylesheet" href="css/modern-card-effects.css">'
            $modified = $true
        } elseif ($content -match '<link rel="stylesheet" href="../css/style.css">') {
            # Si la page est dans un sous-dossier
            $content = $content -replace '(<link rel="stylesheet" href="../css/style.css">)', '$1
    <link rel="stylesheet" href="../css/modern-card-effects.css">'
            $modified = $true
        }
    }
    
    # 2. Remplacer l'ancien script de transition par le nouveau
    if ($content -match '<script src="js/page-transitions.js"></script>') {
        $content = $content -replace '<script src="js/page-transitions.js"></script>', '<script src="js/improved-transitions.js"></script>'
        $modified = $true
    } elseif ($content -match '<script src="../js/page-transitions.js"></script>') {
        $content = $content -replace '<script src="../js/page-transitions.js"></script>', '<script src="../js/improved-transitions.js"></script>'
        $modified = $true
    }
    
    # 3. Ajouter une balise style pour forcer le fond noir pendant les transitions
    if ($content -notmatch 'body, html { background-color: #121212; }') {
        $content = $content -replace '(</head>)', '    <style>
        body, html { background-color: #121212; }
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #121212;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.4s ease-in-out;
        }
    </style>
$1'
        $modified = $true
    }
    
    # Sauvegarder les modifications
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Effets modernes et transitions améliorées ajoutés à $($file.Name)"
    } else {
        Write-Host "$($file.Name) déjà à jour ou structure non standard"
    }
}

Write-Host "Application des effets modernes et transitions améliorées terminée !"
