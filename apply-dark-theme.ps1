# Script pour ajouter le thème sombre à toutes les pages HTML
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # Ajouter la feuille de style du thème sombre si elle n'existe pas déjà
    if ($content -notmatch '<link rel="stylesheet" href="css/dark-theme.css">') {
        if ($content -match '<link rel="stylesheet" href="css/style.css">') {
            # Si la page a un lien direct vers style.css (fichier à la racine)
            $content = $content -replace '(<link rel="stylesheet" href="css/style.css">)', '$1
    <link rel="stylesheet" href="css/dark-theme.css">'
            $modified = $true
        } elseif ($content -match '<link rel="stylesheet" href="../css/style.css">') {
            # Si la page est dans un sous-dossier (fichier dans un sous-dossier)
            $content = $content -replace '(<link rel="stylesheet" href="../css/style.css">)', '$1
    <link rel="stylesheet" href="../css/dark-theme.css">'
            $modified = $true
        }
    }
    
    # Sauvegarder les modifications si des changements ont été effectués
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Thème sombre ajouté à $($file.Name)"
    } else {
        Write-Host "$($file.Name) déjà à jour ou structure non standard"
    }
}

Write-Host "Thème sombre appliqué à toutes les pages HTML!"
