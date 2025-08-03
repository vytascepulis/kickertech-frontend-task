import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';

const EuroBasket = () => {
  return (
    <div className='max-w-[400px] rounded-lg bg-[#002e26] font-[montserrat] shadow-lg'>
      <div className='p-4 text-2xl font-semibold text-white uppercase'>
        <FontAwesomeIcon icon={faBasketball} className='mr-2' /> Eurobasket
      </div>
      <div className='p-4'>
        <div className='flex justify-between gap-3 text-sm'>
          <Button color='orange'>
            <FontAwesomeIcon icon={faPlus} /> Add Team
          </Button>
          <Button color='orange'>
            <FontAwesomeIcon icon={faPlus} /> Add Score
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EuroBasket;
