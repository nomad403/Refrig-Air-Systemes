import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = 'public/images/home/gallery'
const outputDir = 'public/images/home/gallery'

// Fonction pour convertir un PNG en blanc
async function convertPngToWhite(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      // Convertir toutes les couleurs en blanc
      .greyscale() // D'abord en niveaux de gris
      .modulate({
        brightness: 2, // Augmenter la luminosité
        saturation: 0  // Supprimer la saturation
      })
      .png()
      .resize(400, 200, { 
        fit: 'inside',
        withoutEnlargement: true,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputPath)
    
    console.log(`✅ PNG converti en blanc: ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Erreur pour ${inputPath}:`, error.message)
  }
}

// Fonction pour rendre un PNG entièrement blanc (remplacer par du blanc pur)
async function makePngSolidWhite(inputPath, outputPath) {
  try {
    const { width, height } = await sharp(inputPath).metadata()
    
    await sharp({
      create: {
        width: width || 400,
        height: height || 200,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // Blanc pur
      }
    })
      .png()
      .toFile(outputPath)
    
    console.log(`✅ PNG rendu blanc pur: ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Erreur pour ${inputPath}:`, error.message)
  }
}

// Fonction pour inverser les couleurs d'un PNG (noir devient blanc, blanc devient noir)
async function invertPngColors(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .negate() // Inverse les couleurs
      .png()
      .resize(400, 200, { 
        fit: 'inside',
        withoutEnlargement: true,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputPath)
    
    console.log(`✅ Couleurs inversées: ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`❌ Erreur pour ${inputPath}:`, error.message)
  }
}

// Fonction principale
async function processPngFiles() {
  console.log('🎨 Traitement des fichiers PNG...\n')
  
  try {
    const files = fs.readdirSync(inputDir)
    const pngFiles = files.filter(file => file.endsWith('.png'))
    
    if (pngFiles.length === 0) {
      console.log('❌ Aucun fichier PNG trouvé')
      return
    }
    
    console.log(`📁 Trouvé ${pngFiles.length} fichiers PNG:`)
    pngFiles.forEach(file => console.log(`  - ${file}`))
    console.log('')
    
    // Menu de choix
    console.log('Choisissez le type de traitement:')
    console.log('1. Convertir en blanc (gris + luminosité)')
    console.log('2. Rendre entièrement blanc pur')
    console.log('3. Inverser les couleurs')
    console.log('')
    
    // Pour l'instant, on fait la conversion en blanc
    console.log('🔄 Conversion en blanc...')
    
    for (const pngFile of pngFiles) {
      const inputPath = path.join(inputDir, pngFile)
      const outputPath = path.join(outputDir, pngFile.replace('.png', '_white.png'))
      
      await convertPngToWhite(inputPath, outputPath)
    }
    
    console.log('\n🎉 Traitement terminé !')
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

processPngFiles()
