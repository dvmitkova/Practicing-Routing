import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function ArticleDetails() {
    const [article, setArticle] = useState({});
    const {articleId} = useParams();

    //Asynchronous function
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${articleId}`)
            
            if (response.statusText == 'No Content') {
                //redirect to 404
            }
            
            const result = await response.json();

            setArticle(result)
        })()
    }, [])

    //Promise
    // useEffect(() => {
    //     fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${articleId}`)
    //         .then(response => {
    //             if (response.statusText == 'No Content') {
    //                 navigate('/not-found');
    //                 return;
    //             }
    //             return response.json();
    //         })
    //     .then(result => setArticle(result))
    // })


  return (
    <div className="m-20 p-10">
    <p className="text-base font-semibold leading-7 text-indigo-600">Article</p>
    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{article.title}</h1>
    <p className="mt-6 text-xl leading-8 text-gray-700">{article.content}
    </p>
  </div>
  )
}
