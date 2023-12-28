import { Circle, Geometry, Point, Rect } from "../Geometry";
import { Position } from "./Position";

export abstract class CollisionDetection{
    private static collisionRectRect(rectA: Rect, rectB: Rect):boolean{
        return(
            rectA.left <= rectB.right &&
            rectA.right >= rectB.left &&
            rectA.top <= rectB.bottom &&
            rectA.bottom >= rectB.top
        )
    }

    private static collisionCircleCircle(circleA: Circle, circleB: Circle):boolean{
        let distance =  circleA.position.distanceTo(circleB.position)
        return distance < circleA.radius + circleB.radius;
    }

    private static collisionPointPoint(pointA:Point, pointB: Point):boolean{
        return pointA.position.equal(pointB.position)
    }

    private static collisionRectPoint(rect:Rect, point:Point):boolean{
        return (
            point.x >= rect.left &&
            point.x <= rect.right &&
            point.y >= rect.top &&
            point.y <= rect.bottom
        );
    }

    private static collisionRectCircle(rect:Rect, circle:Circle):boolean{
        let closestX = clamp(circle.position.x, rect.left, rect.right);
        let closestY = clamp(circle.position.y, rect.top, rect.bottom);

        let distanceX = circle.position.x - closestX;
        let distanceY = circle.position.y - closestY;

        let distanceSquared = distanceX * distanceX + distanceY * distanceY;
        return distanceSquared < circle.radius * circle.radius;
    }

    private static collisionCirclePoint(circle:Circle, point: Point){
        let distance =  point.position.distanceTo(circle.position)
        return distance < circle.radius;
    }


    public static collision(objA: Geometry, objB: Geometry): boolean{
        if (objA instanceof Rect && objB instanceof Rect) {
            return CollisionDetection.collisionRectRect(objA, objB);
        } else if (objA instanceof Circle && objB instanceof Circle) {
            return CollisionDetection.collisionCircleCircle(objA, objB);
        } else if (objA instanceof Point && objB instanceof Point) {
            return CollisionDetection.collisionPointPoint(objA, objB);
        } else if (objA instanceof Rect && objB instanceof Point) {
            return CollisionDetection.collisionRectPoint(objA, objB);
        } else if (objA instanceof Point && objB instanceof Rect) {
            return CollisionDetection.collisionRectPoint(objB, objA);
        } else if (objA instanceof Rect && objB instanceof Circle) {
            return CollisionDetection.collisionRectCircle(objA, objB);
        } else if (objA instanceof Circle && objB instanceof Rect) {
            return CollisionDetection.collisionRectCircle(objB, objA);
        } else if (objA instanceof Circle && objB instanceof Point) {
            return CollisionDetection.collisionCirclePoint(objA, objB);
        }else if (objA instanceof Point && objB instanceof Circle) {
            return CollisionDetection.collisionCirclePoint(objB, objA);
        }
        return false;
    }

    public static isPointInsideGeometry(position:Position, geometry: Geometry) {
        const point = new Point(position)
        return CollisionDetection.collision(point, geometry)
    }
}


function clamp(value:number, min:number, max:number):number {
    return Math.max(min, Math.min(max, value));
}
