import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();//! 1.Създаваме abortController;

    (async () => {
      const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list', {
        signal: abortController.signal //! 2. Закачаме abortConroller-a
      });
      const result = await response.json();

      setArticles(result)
    })();

    return () => {//! 3. Спираме заявката при clean up - unmount на компонента
      abortController.abort();
    }

  }, [])

    return (
      <ul role="list" className="m-20 p-10 divide-y divide-gray-100">
        {articles.map((article) => (
          <Link to={`/articles/${article._id}`} key={article._id} >
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img alt="" src={article.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{article.title}</p>
              </div>
            </div> 
            </li>
            </Link>
        ))}
      </ul>
    )
  }
  