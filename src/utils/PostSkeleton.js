import {
   Avatar,
   Card,
   CardContent,
   CardHeader,
   makeStyles,
} from "@material-ui/core";
import React, { Fragment } from "react";
import noImg from "../Images/no-img.png";

const useStyle = makeStyles({
   card: {
      marginBottom: 15,
   },
   title: {
      width: "30%",
      height: 12,
      backgroundColor: "rgba(0,0,0, 0.6)",
      marginBottom: 3,
   },
   time: {
      width: "15%",
      height: 10,
      backgroundColor: "rgba(0,0,0, 0.6)",
   },
   fullLine: {
      height: 15,
      width: "90%",
      backgroundColor: "#939294",
      marginBottom: 10,
   },
   halfLine: {
      height: 15,
      width: "50%",
      backgroundColor: "#939294",
      marginBottom: 10,
   },
});

function PostSkeleton() {
   const classes = useStyle();
   const content = Array.from({ length: 5 }).map((item, index) => (
      <Card className={classes.card} key={index}>
         <CardHeader
            avatar={<Avatar aria-label="recipe" src={noImg}></Avatar>}
            title={<div className={classes.title}></div>}
            subheader={<div className={classes.time}></div>}
         ></CardHeader>
         <CardContent>
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.halfLine} />
         </CardContent>
      </Card>
   ));
   return <Fragment>{content}</Fragment>;
}

export default PostSkeleton;
