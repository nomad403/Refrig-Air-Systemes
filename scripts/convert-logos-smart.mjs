import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = 'public/images/home/gallery'
const outputDir = 'public/images/home/gallery'

// Fonction pour détecter si un logo a un fond
function hasBackground(svgContent) {
  const hasRect = /<rect[^>]*fill[^>]*>/i.test(svgContent)
  const hasCircle = /<circle[^>]*fill[^>]*>/i.test(svgContent)
  const hasEllipse = /<ellipse[^>]*fill[^>]*>/i.test(svgContent)
  const hasPath = /<path[^>]*fill[^>]*>/i.test(svgContent)
  
  // Si on trouve des formes géométriques avec fill, c'est probablement un fond
  return hasRect || hasCircle || hasEllipse || hasPath
}

// Fonction pour convertir un logo avec fond (fond blanc, éléments transparents)
async function convertLogoWithBackground(inputPath, outputPath) {
  try {
    const svgContent = fs.readFileSync(inputPath, 'utf8')
    
    // Convertir le fond en blanc et les éléments en transparent
    const adaptedSvg = svgContent
      // Fond en blanc
      .replace(/fill="[^"]*"/g, (match) => {
        // Garder les formes de fond en blanc, rendre le texte transparent
        if (match.includes('fill="none"')) return match
        return 'fill="white"'
      })
      .replace(/stroke="[^"]*"/g, 'stroke="white"')
      // Texte en transparent (on va utiliser une approche différente)
      .replace(/<text[^>]*>/g, (match) => {
        return match.replace(/fill="[^"]*"/g, 'fill="transparent"')
      })
    
    await sharp(Buffer.from(adaptedSvg))
      .png()
      .resize(400, 200, { 
        fit: 'inside',
        withoutEnlargement: true,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputPath)
    
    console.log(`✅ Logo avec fond converti: ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Erreur:`, error.message)
  }
}

// Fonction pour convertir un logo sans fond (tout en blanc)
async function convertLogoWithoutBackground(inputPath, outputPath) {
  try {
    const svgContent = fs.readFileSync(inputPath, 'utf8')
    
    // Convertir tout en blanc
    const whiteSvg = svgContent
      .replace(/fill="[^"]*"/g, 'fill="white"')
      .replace(/stroke="[^"]*"/g, 'stroke="white"')
      .replace(/fill:[^;]+/g, 'fill:white')
      .replace(/stroke:[^;]+/g, 'stroke:white')
      .replace(/fill="none"/g, 'fill="none"')
      .replace(/stroke="none"/g, 'stroke="none"')
    
    await sharp(Buffer.from(whiteSvg))
      .png()
      .resize(400, 200, { 
        fit: 'inside',
        withoutEnlargement: true,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputPath)
    
    console.log(`✅ Logo sans fond converti: ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Erreur:`, error.message)
  }
}

// Fonction principale
async function convertAllLogos() {
  console.log('🎨 Conversion intelligente des logos...\n')
  
  try {
    const files = fs.readdirSync(inputDir)
    const svgFiles = files.filter(file => file.endsWith('.svg'))
    
    console.log(`📁 Traitement de ${svgFiles.length} logos SVG:`)
    
    for (const svgFile of svgFiles) {
      const inputPath = path.join(inputDir, svgFile)
      const outputPath = path.join(outputDir, svgFile.replace('.svg', '.png'))
      
      const svgContent = fs.readFileSync(inputPath, 'utf8')
      
      if (hasBackground(svgContent)) {
        await convertLogoWithBackground(inputPath, outputPath)
      } else {
        await convertLogoWithoutBackground(inputPath, outputPath)
      }
    }
    
    console.log('\n🎉 Conversion terminée !')
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

convertAllLogos()
