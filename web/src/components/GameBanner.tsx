interface GameBannerProps {
    id: string;
    bannerUrl: string;
    gameName: string;
    adsCount: number;
}

export default function GameBanner( props: GameBannerProps ) {
    return (
        <a href={'games/'+ props.id + '/ads/'} className='relative rounded-lg overflow-hidden mx-2' id={props.id}>
          <img src={props.bannerUrl} alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-gama-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>{props.gameName}</strong>
            <span className='text-zinc-300 text-sm  block '>{props.adsCount} anúncios(s)</span>
          </div>
        </a>
    )
}