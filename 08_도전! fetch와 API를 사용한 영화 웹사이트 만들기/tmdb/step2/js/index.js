// 서버한테 같이 전달하는 포스트잇 같은 느낌..
const options = {
   method: 'GET', // RestFul 방식 중 GET방식으로 요청
   headers: {
      accept: 'application/json', // 저는 json 객체 형태로 데이터를 받을게요~ 라고 서버에게 요청
      // 보안을 위해서 서버에서 주는 인증키
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTcyOTgyNDc5MS43NjUxNTgsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eCX8hid8Pb1fUbm35MiBxCUoybIMGZYL26wmLZH68XI',
   },
}

// fetch: 서버에 request를 요청하는 자바스크립트에서 제공하는 함수
// fetch(request 주소, request 할때 서버에 같이 전달하는 옵션)
// 물음표 뒤는 쿼리스트링: 서버에 보내는 값들

/*
왜? fetch는 promise를 사용할까?(왜 비동기일까?)

promise, async, await -> 비동기
request 해주는 과정을 비동기로 동작시키고 있다

서버에 장애가 있거나 네트워크 문제가 있거나 했을때 동기적으로 실행이 된다면 
사용자는 다른 작업을 할 수 X -> 따라서 request 작업은 비동기로 진행된다.
*/

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

// getPlayingMovies(url)
//    .then((res) => {
//       console.log(res) // response 정보 + 데이터
//       return res.json() // 실제 데이터만 리턴
//    })
//    .then((res) => console.log(res))
//    .catch((err) => console.error(err)) //request할때 문제 발생시 실행

// async, await 사용
const getPlayingMovies = async (url) => {
   try {
      const response = await fetch(url, options) // 서버에서 데이터 가져올때까지 기다린다
      //   console.log(response) // 기다렸다가 다 가지고 오면 실행

      const data = await response.json() //await를 지정하는 이유: fetch는 비동기적으로 실행되므로 서버에서 request 해오는 딜레이 시간 중에 실행 된다.
      //   console.log(data.results)

      data.results.forEach((result) => {
         console.log(result.title)
         console.log(result.id) // 영화를 구분하기 위한 고유의 id
         console.log(result.poster_path)
         console.log(result.vote_average)
         console.log('')
      })
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getPlayingMovies(url)
