# Script pour ajouter les améliorations esthétiques aux pages supplémentaires
$targetPages = @(
    "situations-professionnelles.html",
    "veille.html",
    "stages.html"
)

foreach ($page in $targetPages) {
    $filePath = Join-Path -Path (Get-Location) -ChildPath $page
    
    if (Test-Path $filePath) {
        $content = Get-Content -Path $filePath -Raw
        $modified = $false
        
        # Ajouter la feuille de style enhanced-additional-pages.css si elle n'existe pas déjà
        if ($content -notmatch '<link rel="stylesheet" href="css/enhanced-additional-pages.css">') {
            # Ajouter après le lien vers dark-theme.css s'il existe
            if ($content -match '<link rel="stylesheet" href="css/dark-theme.css">') {
                $content = $content -replace '(<link rel="stylesheet" href="css/dark-theme.css">)', '$1
    <link rel="stylesheet" href="css/enhanced-additional-pages.css">'
                $modified = $true
            }
            # Sinon, ajouter après le lien vers style.css
            elseif ($content -match '<link rel="stylesheet" href="css/style.css">') {
                $content = $content -replace '(<link rel="stylesheet" href="css/style.css">)', '$1
    <link rel="stylesheet" href="css/enhanced-additional-pages.css">'
                $modified = $true
            }
        }
        
        # Sauvegarder les modifications
        if ($modified) {
            Set-Content -Path $filePath -Value $content
            Write-Host "Améliorations esthétiques ajoutées à $page"
        } else {
            Write-Host "$page déjà à jour ou structure non standard"
        }
    } else {
        Write-Host "Le fichier $page n'existe pas dans le répertoire courant"
    }
}

Write-Host "Améliorations esthétiques appliquées aux pages supplémentaires!"
