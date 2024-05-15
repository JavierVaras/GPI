import puppeteer from "puppeteer";
import fs from "fs/promises"


//SCRAPPING
async function getDataFromAudi(){
    const browser = await puppeteer.launch(
    )
    const pagemain = await browser.newPage()
    await pagemain.goto('https://www.audi.cl/modelos/nuestros-modelos')
    const result = await pagemain.evaluate(() => {
        var id = 0
        const marca = "Audi"
        const nombre_vehiculo = document.querySelectorAll(".sc-9b9b6b3c-56.dvpkrG")
        const data = [...nombre_vehiculo].map(nombre_vehiculo => {
            const modelo = nombre_vehiculo.querySelector(".sc-9b9b6b3c-60.loBYsy").innerText
            var precio = [...nombre_vehiculo.querySelectorAll(".sc-9b9b6b3c-61.kQWMNa")].map((pr) => pr.innerText.slice(6,20))[0]
            if(precio == null){precio = "Por definir"}
            id = id + 1
            return{
                id,
                marca,
                modelo,
                precio
            }
        })
        return data
    })
    console.log(result)
    await fs.appendFile('vehiculoAudi.json', JSON.stringify(result,null,2))
    await browser.close()
}

async function getDataFromHyundai(){
    const browser = await puppeteer.launch(
    )
    const pagemain = await browser.newPage()
    await pagemain.goto('https://www.hyundai.cl/nuestros-modelos/')
    const result = await pagemain.evaluate(() => {
        var id = 0
        const marca = "Hyundai"
        const nombre_vehiculo = document.querySelectorAll(".compara-card")
        const data = [...nombre_vehiculo].map(nombre_vehiculo => {
            const modelo = nombre_vehiculo.querySelector(".compara-card__name.mb-0").innerText
            const precio = nombre_vehiculo.querySelector(".compara-card__price").innerText.slice(6,20)
            if(precio == null){precio = "Por definir"}
            id = id + 1
            return{
                id,
                marca,
                modelo,
                precio
            }
        })
        return data
    })
    console.log(result)
    await fs.appendFile('vehiculoHyundai.json', JSON.stringify(result,null,2))
    await browser.close()
}


getDataFromAudi()
getDataFromHyundai()


