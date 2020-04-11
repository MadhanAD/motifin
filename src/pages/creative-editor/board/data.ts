import {LayoutVariant} from "../../../models/LayoutVariant";

export const layoutVariantList: LayoutVariant[] = [
    {
        id: 1,
        title: "Facebook",
        sizeList: [
            {
                id: 1,
                title: "Post: 1200 * 630",
                width: 1200,
                height: 630
            },
            {
                id: 2,
                title: "Covers: 851 * 315",
                width: 851,
                height: 315
            }
        ]
    },
    {
        id: 2,
        title: "Instagram",
        sizeList: [
            {
                id: 1,
                title: "Story: 1080 * 1920",
                width: 1080,
                height: 1920
            },
            {
                id: 2,
                title: "Post: 1080 * 1080",
                width: 1080,
                height: 1080
            }
        ]
    },
    {
        id: 3,
        title: "Youtube",
        sizeList: [
            {
                id: 1,
                title: "Cover: 2560 * 1440",
                width: 2560,
                height: 1440
            }
        ]
    },
    {
        id: 4,
        title: "Twitter",
        sizeList: [
            {
                id: 1,
                title: "Cover: 1500 * 500",
                width: 1500,
                height: 500
            }
        ]
    }
]
