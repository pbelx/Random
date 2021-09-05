function print(msg){
    console.log(msg)
}


const puppeteer = require('puppeteer');



(async () => {
var process = require("process")
var name = process.argv[2]
var password = process.argv[3]
const browser = await puppeteer.launch({
    args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
})
const page = await browser.newPage()
await page.goto('http://127.0.0.1:8096/web/index.html#!/login.html?')
print("logging in")

await page.setViewport({ width: 1093, height: 479 })

await page.waitForSelector('#txtManualName')
await page.click('#txtManualName')
await page.type('#txtManualName', "jellyfin")
print("entering username")


await page.waitForSelector('#txtManualPassword')
await page.click('#txtManualPassword')
await page.type('#txtManualPassword', "jellyfinpass")
print("entering password")

await page.waitForSelector('.mainAnimatedPages > #loginPage > .padded-left > .manualLoginForm > .raised')
await page.click('.mainAnimatedPages > #loginPage > .padded-left > .manualLoginForm > .raised')
print("loading log in page")
await page.waitForNavigation({
            waitUntil: 'networkidle0',
          });

await page.waitForSelector('.skinHeader > .flex > .headerLeft > .headerButton:nth-child(3) > .material-icons')
await page.click('.skinHeader > .flex > .headerLeft > .headerButton:nth-child(3) > .material-icons')
print("loading dashboard..")
await page.waitForSelector('.mainDrawer > .mainDrawer-scrollContainer > .userMenuOptions > .navMenuOption:nth-child(2) > .navMenuOptionText')
const [button] = await page.$x("//a[contains(., 'Dashboard')]");
if (button){
    await button.click()
}
print("loading users..")
await page.waitForTimeout(2000)

const [ubutton] = await page.$x("//a[contains(., 'Users')]")
if(ubutton){
    await ubutton.click()
}
await page.waitForTimeout(2000)
await page.waitForSelector('.force-scroll > .mainDrawer > .mainDrawer-scrollContainer > .drawerContent > .navMenuOption:nth-child(4)')
await page.click('.force-scroll > .mainDrawer > .mainDrawer-scrollContainer > .drawerContent > .navMenuOption:nth-child(4)')

await page.waitForSelector('.content-primary > .verticalSection > .sectionTitleContainer > .fab > .material-icons')
await page.click('.content-primary > .verticalSection > .sectionTitleContainer > .fab > .material-icons')
print("adding user " + name)
await page.waitForSelector('#txtUsername')
await page.click('#txtUsername')
await page.type("#txtUsername",name)
print("username added " + name)

await page.waitForSelector('#txtPassword')
await page.click('#txtPassword')
await page.type("#txtPassword",password)
print("added password " + password)
// await page.click('.mainDrawer > .mainDrawer-scrollContainer > .userMenuOptions > .navMenuOption:nth-child(2) > .navMenuOptionText')
print("adding media library")
await page.click(".checkboxOutline")
const [savebutton] = await page.$x("//Button[contains(., 'Save')]")
if(savebutton){
    await savebutton.click()
}
await page.screenshot({path:"xx.png"})
await browser.close()
console.log("done")
})();
