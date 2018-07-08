exports.beer = function () {
    number = 6
    var random = Math.floor(Math.random() * (number - 1 + 1))
    var beerpic = [
        'https://stickershop.line-scdn.net/stickershop/v1/product/1258914/LINEStorePC/main@2x.png;compress=true?__=20161019',
        'https://stickershop.line-scdn.net/stickershop/v1/product/1259989/LINEStorePC/main@2x.png;compress=true?__=20161019',
        'https://pbs.twimg.com/profile_images/424938578376810496/dyNkHXXz.jpeg',
        'https://stickershop.line-scdn.net/stickershop/v1/product/1021012/LINEStorePC/main@2x.png;compress=true',
        'https://stickershop.line-scdn.net/stickershop/v1/product/1306903/LINEStorePC/main@2x.png;compress=true?__=20161019',
        'https://stickershop.line-scdn.net/stickershop/v1/product/1228769/LINEStorePC/main@2x.png;compress=true',
        'https://stickershop.line-scdn.net/stickershop/v1/product/1795291/LINEStorePC/main@2x.png;compress=true']

    return {
        beerz: beerpic[random],
        
    }
}

exports.yo = function () {
    number = 3
    var random = Math.floor(Math.random() * (number - 1 + 1))
    var yopic = [
        'https://stickershop.line-scdn.net/stickershop/v1/product/4456/LINEStorePC/main@2x.png;compress=true',
        'https://stickershop.line-scdn.net/stickershop/v1/product/1277438/LINEStorePC/main@2x.png;compress=true',
        'https://f.ptcdn.info/375/039/000/o15vuwahkJhKBjhuSLr-o.jpg']

    return {
        yoz: yopic[random]
    }
}

exports.nest = function () {
    number = 3
    var random = Math.floor(Math.random() * (number - 1 + 1))
    var nestpic = [
        'https://f.ptcdn.info/904/017/000/1397744420-1025543567-o.jpg',
        'https://image.dek-d.com/27/0573/2645/t_121928659',
        'https://f.ptcdn.info/210/025/000/1415098773-2-o.png']

    return {
        nestz: nestpic[random]
    }
}
