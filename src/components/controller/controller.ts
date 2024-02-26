import Article from '../../types/article';
import Source from '../../types/source';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: { sources: Source[] }) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: { articles: Article[] }) => void) {
        let target = e.target;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target) {
                if ((target as HTMLElement).classList.contains('source__item')) {
                    const sourceId = (target as HTMLElement).getAttribute('data-source-id');
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        if (sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                        }
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = (target as HTMLElement).parentNode;
            }
        }
    }
}

export default AppController;
