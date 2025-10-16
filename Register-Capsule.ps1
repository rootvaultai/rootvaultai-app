# RegisteredBrand.AI™
# Register-Capsule.ps1 — Combined Single Script
# Collect brand or human data → Save to /submissions as a trust Capsule

$scriptRoot = $PSScriptRoot
$submissionsPath = "$scriptRoot\..\submissions"

if (-not (Test-Path $submissionsPath)) {
    New-Item -ItemType Directory -Path $submissionsPath | Out-Null
}

Write-Host "`n🧾 REGISTER A NEW ENTITY WITH REGISTEREDBRAND.AI" -ForegroundColor Cyan
$type         = Read-Host "Capsule Type (Brand / Human / Agent)"
$name         = Read-Host "Name (Brand or Full Name)"
$email        = Read-Host "Email Address"
$website      = Read-Host "Website or Domain (optional)"
$duns         = Read-Host "DUNS Number (for brands, optional)"
$identityCode = Read-Host "Identity Code (for humans/agents, optional)"
$trustURI     = Read-Host "Trust Profile URL (optional)"
$tier         = "Free"
$status       = "pending"
$submittedAt  = Get-Date
$uuid         = [guid]::NewGuid().ToString()

$capsule = [ordered]@{
    capsuleId       = $uuid
    type            = $type
    name            = $name
    email           = $email
    website         = $website
    duns            = $duns
    identityCode    = $identityCode
    trustProfileURI = $trustURI
    tier            = $tier
    submittedAt     = $submittedAt
    status          = $status
}

$outFile = "$submissionsPath\capsule_$($uuid).json"
$capsule | ConvertTo-Json -Depth 5 | Set-Content -Path $outFile -Encoding utf8

Write-Host "`n✅ Capsule submitted successfully!" -ForegroundColor Green
Write-Host "📄 Saved to: $outFile" -ForegroundColor Yellow
