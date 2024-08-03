/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import styles from './styles.module.css';
import { ImageZoomProps } from './interace';
import { Loading } from '../Loading';

export const ImageZoom = ({ image }: ImageZoomProps) => {

    const containerRef = useRef<any>(null);
    const [offset, setOffset] = useState({ left: 0, top: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
  
    const handleMouseEnter = () => {
        setIsZoomed(true);
    };
  
    const handleMouseLeave = () => {
        setIsZoomed(false);
    };
  
    const handleMouseMove = (e: any) => {
        const containerRect = containerRef?.current?.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;
        const xPercent = (x / containerRect.width) * 100;
        const yPercent = (y / containerRect.height) * 100;
    
        setOffset({
            left: xPercent,
            top: yPercent,
        });
    };

    return (
        <div style={{ width: '100%' }}>
            {
                image ? (
                    <div
                        className={styles["container"]}
                        ref={containerRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            className={styles["source"]}
                            alt="source"
                            src={image}
                            width={400}
                            height={400}
                        />
                        { isZoomed && (
                            <div
                                className={styles["zoom-lens"]}
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundPosition: `${offset.left}% ${offset.top}%`,
                                }}
                            />
                        )}
                    </div>
                ) : <Loading />
            }
        </div>
    )
}
