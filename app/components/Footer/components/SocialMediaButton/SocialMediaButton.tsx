import { Button } from "@chakra-ui/react";
import Image from "next/image";

const socialMediaImage = {
    facebook: 'facebook.svg',
    x: 'x.svg',
    instagram: 'instagram.svg'
};

export function SocialMediaButton({ socialMediaName }: { socialMediaName: 'facebook' | 'x' | 'instagram' }) {

    return (
        <Button bgColor={'transparent'} as='a' href={`www.${socialMediaName}.com`} width={'fit-content'} height={'fit-content'} _hover={{ backgroundColor: 'transparent' }}>
            <Image src={`images/social/${socialMediaImage[socialMediaName]}`} height={35} width={35} alt={`${socialMediaName} icon`}></Image>
        </Button>
    )

}