interface ImainTabCategory {
  category: {
    title: string;
    // image?: ReactNode;
    // place: any;
    type: number;
    //type: number;
    // onClick: ({ categoryType }: Tcategory) => void;
  };
}
export const mainTabCategory: ImainTabCategory[] = [
  {
    category: {
      title: '찜한장소',
      type: 0,
      // image: IcoFavorite,
      // place: null,
    },
  },
  {
    category: {
      title: '리뷰 쓴곳',
      type: 1,
      // image: IcoReview,
      // place: null,
    },
  },
];
