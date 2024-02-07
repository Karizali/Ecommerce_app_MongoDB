import './Footer.css';
import FooterDetailsList from '../FooterDetailsList/FooterDetailsList';

function Footer() {
    return (
        <>
            <div className='FooterListContainer'>
                <FooterDetailsList title={"POPULAR CATEGORIES"} listArray={["Bikes", "Watches", "Books", "Dogs"]} />
                <FooterDetailsList title={"TRENDING SEARCHES"} listArray={["Cars", "Flats for rent", "Mobile Phones", "Jobs"]} />
                <FooterDetailsList title={"ABOUT US"} listArray={["About Dubizzle Group", "OLX Blog", "Contact Us", "OLX for Businesses"]} />
                <FooterDetailsList title={"OLX"} listArray={["Help", "Sitemap", "Terms of use", "Privacy Policy"]} />
                <div className='followContainer'>
                    <div className='followTitle'>Follow us</div>
                    <img src="https://www.olx.com.pk/assets/iconAppStoreEN_noinline.a731d99c8218d6faa0e83a6d038d08e8.svg" alt="" />
                    <img src="https://www.olx.com.pk/assets/iconGooglePlayEN_noinline.9892833785b26dd5896b7c70b089f684.svg" alt="" />
                    <img src="https://www.olx.com.pk/assets/iconAppGallery_noinline.6092a9d739c77147c884f1f7ab3f1771.svg" alt="" />
                </div>
            </div>
            <div className='FooterLower'>
                <div>
                    <span className='bold'>Free Classifieds in Pakistan</span>
                    <span> . © 2006-2024 OLX</span>
                </div>
            </div>
        </>
    );
}

export default Footer;