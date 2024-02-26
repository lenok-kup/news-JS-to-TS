import Article from '../../types/article';
import Source from '../../types/source';
import AppController from '../controller/controller';
import AppView from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document.querySelector<HTMLElement>('.sources')?.addEventListener('click', (e: MouseEvent) => this.controller.getNews(e, (data: {articles: Article[]}) => this.view.drawNews(data)));
        this.controller.getSources((data: { sources: Source[]; }) => this.view.drawSources(data));
    }
}

export default App;

