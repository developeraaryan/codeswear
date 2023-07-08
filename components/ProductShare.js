import React from 'react';
import PropTypes from 'prop-types';
import { Email, Facebook, LinkedIn, Pinterest, Reddit, Telegram, Twitter, WhatsApp, VKontakte, Sms, FileCopy } from '@material-ui/icons';
import { IoLogoTumblr, IoLogoWordpress, IoLogoXing } from 'react-icons/io';
import { SlSocialSkype, SlSocialVkontakte } from 'react-icons/sl';
import { IconBrandBlogger, IconBrandPocket, IconBrandWeibo } from '@tabler/icons-react';
import { IconBrandEvernote } from '@tabler/icons-react';


const ProductShare = ({ url, title }) => {
    // Define the social media platforms
    const platforms = [
        {
            name: 'Facebook',
            icon: <Facebook />,
            shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Twitter',
            icon: <Twitter />,
            shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        },
        {
            name: 'LinkedIn',
            icon: <LinkedIn />,
            shareUrl: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Email',
            icon: <Email />,
            shareUrl: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,

        },
        {
            name: 'WhatsApp',
            icon: <WhatsApp />,
            shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
        },
        {
            name: 'Pinterest',
            icon: <Pinterest />,
            shareUrl: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
        },
        {
            name: 'Reddit',
            icon: <Reddit />,
            shareUrl: `https://reddit.com/submit/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Tumblr',
            icon: <IoLogoTumblr />,
            shareUrl: `https://www.tumblr.com/share/link?url=${encodeURIComponent(url)}&name=${encodeURIComponent(title)}`,
        },
        {
            name: 'Telegram',
            icon: <Telegram />,
            shareUrl: `https://telegram.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        },
        {
            name: 'VK',
            icon: <SlSocialVkontakte />,
            shareUrl: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Xing',
            icon: <IoLogoXing />,
            shareUrl: `https://www.xing.com/app/user?op=share;url=${encodeURIComponent(url)};title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Weibo',
            icon: <IconBrandWeibo />,
            shareUrl: `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Pocket',
            icon: <IconBrandPocket />,
            shareUrl: `https://getpocket.com/save?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Evernote',
            icon: <IconBrandEvernote />,
            shareUrl: `https://www.evernote.com/clip.action?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        },
        {
            name: 'Blogger',
            icon: <IconBrandBlogger />,
            shareUrl: `https://www.blogger.com/blog-this.g?u=${encodeURIComponent(url)}&n=${encodeURIComponent(title)}`,
        },
        {
            name: 'WordPress',
            icon: <IoLogoWordpress />,
            shareUrl: `https://wordpress.com/wp-admin/press-this.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}&s=${encodeURIComponent(title)}&i=&v=2`,
        },
        {
            name: 'Skype',
            icon: <SlSocialSkype />,
            shareUrl: `https://web.skype.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        },
        {
            name: 'SMS',
            icon: <Sms />,
            shareUrl: `sms:?body=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
        },

        {
            name: 'Copy',
            icon: <FileCopy />,
            shareUrl: `javascript:window.copy()`,
        },


    ];

    // Render the component
    return (
        <div>
            {platforms.map(platform => (
                <a
                    key={platform.name}
                    href={platform.shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {platform.icon}
                </a>
            ))}
        </div>
    );
};

ProductShare.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default ProductShare;
