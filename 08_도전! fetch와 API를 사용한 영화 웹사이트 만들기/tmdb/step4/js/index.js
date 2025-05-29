const options = {
   method: 'GET', //RestFul 방식 중 GET방식으로 요청
   headers: {
      accept: 'application/json', //저는 json 형태로 데이터를 받을거에요~ 라고 서버에서 요청
      //보안을 위해 서버에게 주는 인증키
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTcxOTg5NTcxOS43NjI4OSwic3ViIjoiNjI0ZDQzNDFjMzkyNjYwMDRmOTI5OGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ruIypQSMtEMHNnGzEoff8malu2AAblE5ehb53jpQTHE',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

//1. promise fetch 사용
// fetch(url, options)
//    .then((response) => response.json())
//    .then((response) => console.log(response))
//    .catch((err) => console.error(err))

//2. async, await 사용
const getPlayingMovies = async (url) => {
   try {
      const response = await fetch(url, options)
      const data = await response.json()
      const results = data.results

      const container = document.querySelector('main .container')
      let rowsHtml = '' // 모든 row를 담을 문자열

      for (let i = 0; i < results.length; i += 4) {
         // 각 row는 4개의 card를 가짐
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break // results 배열을 벗어나면 중단

            const movie = results[index]
            rowHtml += `
               <div class="col-sm-3 p-3">
                  <div class="card">
                     <a href="./detail.html?movie_id=${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                     </a>
                     <div class="card-body">
                        <p class="card-text title">${movie.title}</p>
                        <p class="card-text average">${Number(movie.vote_average) === 0 ? '미반영' : movie.vote_average.toFixed(1) + '점'}</p>
                     </div>
                  </div>
               </div>`
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml // 전체 row 문자열에 추가
      }

      container.innerHTML = rowsHtml // 컨테이너에 모든 row 추가
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getPlayingMovies(url)
