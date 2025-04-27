# Script pour ajouter les en-têtes de cache à tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Vérifier si les balises de cache existent déjà
    if ($content -match '<meta http-equiv="Cache-Control"') {
        Write-Host "Les balises de cache existent déjà dans $($file.Name)"
        continue
    }
    
    # Insérer les balises de cache après les balises meta existantes
    $modified = $content -replace '(<meta name="viewport"[^>]*>)', '$1
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">'
    
    # Sauvegarder le fichier modifié
    Set-Content -Path $file.FullName -Value $modified
    
    Write-Host "Balises de cache ajoutées à $($file.Name)"
}

Write-Host "Tous les fichiers HTML ont été mis à jour!"
