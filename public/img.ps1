# Ensure output directory exists
$outputDir = "output"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}

# Supported image extensions
$imageExtensions = @("*.png", "*.jpg", "*.jpeg", "*.bmp", "*.tiff")

# Loop through all supported image files
foreach ($ext in $imageExtensions) {
    Get-ChildItem -Path . -Filter $ext | ForEach-Object {
        $inputFile = $_.FullName
        $fileName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        $outputFile = Join-Path $outputDir "$fileName.webp"

        Write-Host "Converting $($_.Name) to WebP..."
        cwebp -q 65 "$inputFile" -o "$outputFile"
    }
}

Write-Host "✅ Conversion complete. All .webp files are saved in the 'output' folder."
