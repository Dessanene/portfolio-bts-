# Script pour mettre à jour toutes les pages HTML avec les correctifs nécessaires
$directoryPath = Get-Location
$htmlFiles = Get-ChildItem -Path $directoryPath -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Mise à jour du fichier: $($file.FullName)"
    
    # Lire le contenu du fichier
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remplacer le préchargeur à fond blanc par celui à fond noir
    $content = $content -replace '<link rel="stylesheet" href="css/preloader.css">', '<link rel="stylesheet" href="css/preloader-dark.css">'
    
    # Ajouter le fichier render-fix.css s'il n'est pas déjà présent
    if (-not ($content -match '<link rel="stylesheet" href="css/render-fix.css">')) {
        # Déterminer le chemin relatif correct pour les fichiers CSS
        $relativePath = ""
        $depth = ($file.FullName -split '\\').Count - ($directoryPath -split '\\').Count
        if ($depth -gt 0) {
            $relativePath = "../" * $depth
        }
        
        # Ajouter le fichier render-fix.css après le préchargeur
        $content = $content -replace '<link rel="stylesheet" href="css/preloader-dark.css">', '<link rel="stylesheet" href="css/preloader-dark.css">' + "`r`n" + '    <link rel="stylesheet" href="' + $relativePath + 'css/render-fix.css">'
    }
    
    # Mettre à jour le fichier
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "Fichier mis à jour: $($file.FullName)"
}

Write-Host "Tous les fichiers HTML ont été mis à jour avec succès!"
