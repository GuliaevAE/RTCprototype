import axios from 'axios';



export async function fetching(index:string){
    console.log('index',index)
    const all =  index
    const part = index.slice(0, index.length - 3)
    const vol =  index.slice(0, index.length - 5)



    for (let i = 1; i <= 10; i++) {
        const ind = String(i).length === 1 ? '0' + i : i
        try {
            const res = await axios.get(`https://basket-${ind}.wb.ru/vol${vol}/part${part}/${all}/info/ru/card.json`)
            res.data.links = {
                link_wb: `https://www.wildberries.ru/catalog/${all}/detail.aspx`, link_mp: `https://mpstats.io/wb/item/${all}`,
                link_images:{
                    images_link: `https://basket-${ind}.wb.ru/vol${vol}/part${part}/${all}/images/big/`,
                    // images_count:res.data.media.photo_count
                }
                
            }
            console.log('res', res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}