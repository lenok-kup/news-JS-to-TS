import Article from '../../../types/article';
import './news.css';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('News item template not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                newsClone.querySelector('.news__item')?.classList.add('alt');
            }

            let metaPhotoNews = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (metaPhotoNews) {
                metaPhotoNews.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
            }

            let metaAuthorNews = newsClone.querySelector('.news__meta-author');
            if (metaAuthorNews) {
                metaAuthorNews.textContent = item.author || item.source.name;
            }

            let metaDateNews = newsClone.querySelector('.news__meta-date');
            if (metaDateNews) {
                metaDateNews.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }


            let descriptionTitleNews = newsClone.querySelector('.news__description-title');
            if (descriptionTitleNews) {
                descriptionTitleNews.textContent = item.title;
            }

            let descriptionSourceNews = newsClone.querySelector('.news__description-source');
            if(descriptionSourceNews){
                descriptionSourceNews.textContent = item.source.name;
            }
          
            let descriptionContentNews = newsClone.querySelector('.news__description-content');
            if(descriptionContentNews){
                descriptionContentNews.textContent = item.description;
            }

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        let newsEl = document.querySelector('.news');
        if(newsEl){
            newsEl.innerHTML = '';
            newsEl.appendChild(fragment);
        }
  
    }
}

export default News;


