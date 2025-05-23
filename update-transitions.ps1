# Script pour ajouter les éléments de transition et le préchargeur à toutes les pages HTML
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # 1. Ajouter la feuille de style preloader.css si elle n'existe pas déjà
    if ($content -notmatch '<link rel="stylesheet" href="css/preloader.css">') {
        $content = $content -replace '(<link rel="stylesheet" href="css/style.css">)', '$1
    <link rel="stylesheet" href="css/preloader.css">'
        $modified = $true
    }
    
    # 2. Ajouter le préchargeur et la transition si ils n'existent pas déjà
    if ($content -notmatch '<div class="preloader">') {
        $content = $content -replace '(<body>[\s]*)', '$1
    <!-- Préchargeur -->
    <div class="preloader">
        <div class="loader">
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
        </div>
    </div>
    
    <!-- Transition entre les pages -->
    <div class="page-transition"></div>
    
'
        $modified = $true
    }
    
    # 3. Ajouter la classe content-fade au main s'il n'existe pas déjà
    if ($content -match '<main>' -and $content -notmatch '<main class="content-fade">') {
        $content = $content -replace '<main>', '<main class="content-fade">'
        $modified = $true
    }
    
    # 4. Ajouter le script de transition s'il n'existe pas déjà
    if ($content -notmatch '<script src="js/page-transitions.js"></script>') {
        $content = $content -replace '(</body>)', '    <script src="js/page-transitions.js"></script>
$1'
        $modified = $true
    }
    
    # Sauvegarder les modifications si des changements ont été effectués
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Mise à jour de $($file.Name) terminée"
    } else {
        Write-Host "$($file.Name) déjà à jour"
    }
}

Write-Host "Toutes les pages HTML ont été mises à jour avec les transitions!"
