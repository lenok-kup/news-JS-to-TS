import Source from '../../../types/source';
import './sources.css';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Source item template not found!');
        };

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            let itemNameSelector = sourceClone.querySelector('.source__item-name');

            if (itemNameSelector) {
                itemNameSelector.textContent = item.name;
            }

            let itemSource = sourceClone.querySelector('.source__item');

            if (itemSource) {
                itemSource.setAttribute('data-source-id', item.id);
            }


            fragment.append(sourceClone);
        });

        let sourceElement = document.querySelector('.sources');
        if (sourceElement) {
            sourceElement.append(fragment);
        }
        else {
            throw new Error('Source element not found!');
        }
    }
}

export default Sources;

