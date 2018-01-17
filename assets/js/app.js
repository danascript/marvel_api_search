class ComicSearch {
  constructor() {
    this.api = 'https://gateway.marvel.com:443/v1/public/characters'
    this.apiKey = 'e46e67f0b10564b05a72022e8551cff5'
    this.params = {
      'orderBy': 'name',
      'limit': 30,
      'offset': 0,
      'apikey': this.apiKey
    }
    this.registerEventHandler()
  }

  registerEventHandler() {
    $('#search-form').on('submit', (e) => {
      e.preventDefault()

      this.query = $('#input-name').val().trim()
      this.params.name = this.query

      this.getData((data) => {
        this.showData(data)
      })
    })
  }

  getData(callback) {

    $.getJSON(this.api, this.params)
      .done((data) => {
        if (data.data.results.length < 1) {
          this.getNameIncludesData((data) => {
            this.showData(data)
          })
        } else {
          callback(data)
        }
      })
      .fail((data) => {
        callback(null)
      })
  }

  getNameIncludesData(callback) {

    delete this.params.name
    this.params.nameStartsWith = this.query

    $.getJSON(this.api, this.params)
      .done((data) => {
        if (data.data.results.length === 0) {
          console.error('Sorry, could not find any match')
        } else {
          callback(data)
        }
      })
      .fail((data) => {
        callback(null)
      })
  }

  showData(data) {
    $('.character-list').html(``)
    $('#attribution').html(``)
    data.data.results.forEach((hero) => {

      //description
       let description;
       if (hero.description.length === 0) {
         description = '- Description is not available -'
       } else {
         description = hero.description
       }

       //comics list
       let comics = `<ul class="flat-list" id="comics-list">`

       hero.comics.items.forEach((comic) => {
         comics += `<li class="list-item">${ comic.name }</li>`
       })

       comics += `</ul>`

       //series list
       let series = `<ul class="flat-list" id="series-list">`

       hero.series.items.forEach((serie) => {
         series += `<li class="list-item">${ serie.name }</li>`
       })

       series += `</ul>`

       //combining all together
       $('.character-list').prepend(`
         <li class="list-item">
           <div class="name">${ hero.name }</div>
           <div class="thumbnail">
              <img src="${ hero.thumbnail.path }.${ hero.thumbnail.extension }"
                width="250"
                height="250">
           </div>
           <div class="description">
              ${ description }
           </div>

           <div id="expandedInfo" class="hidden">
             <h2 class="name">Comics</h2>

             ${ comics }

             <br>

             <h2 class="name">Series</h2>

             ${ series }

           </div>
        </li>`)

      $('#attribution').prepend(`${ data.attributionHTML }`)
    })//the end of the forEach loop

    $('.character-list > .list-item').click(this.showHideData)
  }

  showHideData(e) {
    $(e.currentTarget).find('#expandedInfo').toggleClass('hidden')
  }
}

const comic = new ComicSearch()
