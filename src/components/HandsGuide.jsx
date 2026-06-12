    import React from 'react';

    const RU_FINGER_ZONES = {
    leftPinky: ['ё', '1', '!', 'й', 'ф', 'я'],
    leftRing: ['2', '"', 'ц', 'ы', 'ч'],
    leftMiddle: ['3', '№', 'у', 'в', 'с'],
    leftIndex: ['4', ';', '5', '%', 'к', 'е', 'а', 'п', 'м', 'и'],

    rightIndex: ['6', ':', '7', '?', 'н', 'г', 'р', 'о', 'т', 'ь'],
    rightMiddle: ['8', '*', 'ш', 'л', 'б'],
    rightRing: ['9', '(', 'щ', 'д', 'ю'],
    rightPinky: ['0', ')', '-', '_', '=', '+', 'з', 'х', 'ъ', '\\', 'ж', 'э', '.', ',']
    };

    const EN_FINGER_ZONES = {
    leftPinky: ['`', '~', '1', '!', 'q', 'a', 'z'],
    leftRing: ['2', '@', 'w', 's', 'x'],
    leftMiddle: ['3', '#', 'e', 'd', 'c'],
    leftIndex: ['4', '$', '5', '%', 'r', 't', 'f', 'g', 'v', 'b'],

    rightIndex: ['6', '^', '7', '&', 'y', 'u', 'h', 'j', 'n', 'm'],
    rightMiddle: ['8', '*', 'i', 'k', ',', '<'],
    rightRing: ['9', '(', 'o', 'l', '.', '>'],
    rightPinky: ['0', ')', '-', '_', '=', '+', 'p', '[', '{', ']', '}', '\\', '|', ';', ':', "'", '"', '/', '?']
    };

    const FINGER_LABELS = {
    leftPinky: 'Левый мизинец',
    leftRing: 'Левый безымянный',
    leftMiddle: 'Левый средний',
    leftIndex: 'Левый указательный',

    rightIndex: 'Правый указательный',
    rightMiddle: 'Правый средний',
    rightRing: 'Правый безымянный',
    rightPinky: 'Правый мизинец',

    thumbs: 'Большой палец / пробел'
    };

    const leftFingers = [
    { id: 'leftPinky', label: 'Й\nФ\nЯ', height: 78, rotate: -12, top: 28 },
    { id: 'leftRing', label: 'Ц\nЫ\nЧ', height: 92, rotate: -6, top: 12 },
    { id: 'leftMiddle', label: 'У\nВ\nС', height: 104, rotate: 0, top: 0 },
    { id: 'leftIndex', label: 'К Е\nА П\nМ И', height: 96, rotate: 7, top: 10 }
    ];

    const rightFingers = [
    { id: 'rightIndex', label: 'Н Г\nР О\nТ Ь', height: 96, rotate: -7, top: 10 },
    { id: 'rightMiddle', label: 'Ш\nЛ\nБ', height: 104, rotate: 0, top: 0 },
    { id: 'rightRing', label: 'Щ\nД\nЮ', height: 92, rotate: 6, top: 12 },
    { id: 'rightPinky', label: 'З Х Ъ\nЖ Э\n. ,', height: 78, rotate: 12, top: 28 }
    ];

    const getFingerByChar = (char, language) => {
    if (!char) return null;
    if (char === ' ') return 'thumbs';

    const normalizedChar = String(char).toLowerCase();
    const layout = language === 'english' ? EN_FINGER_ZONES : RU_FINGER_ZONES;

    for (const [finger, keys] of Object.entries(layout)) {
    if (keys.includes(normalizedChar)) {
        return finger;
    }
    }

    return null;
    };

    const HandsGuide = ({
    nextChar,
    language = 'russian',
    highlightColor = '#cbd0df',
    shiftKeyId = null,
    side = 'both',
    showHint = true
    }) => {
    const isSideMode = side !== 'both';
    const showLeftHand = side === 'both' || side === 'left';
    const showRightHand = side === 'both' || side === 'right';

    const activeFingers = [];

    const mainFinger = getFingerByChar(nextChar, language);
    if (mainFinger) activeFingers.push(mainFinger);

    if (shiftKeyId === 'ShiftLeft') activeFingers.push('leftPinky');
    if (shiftKeyId === 'ShiftRight') activeFingers.push('rightPinky');

    const uniqueActiveFingers = [...new Set(activeFingers)];
    const isThumbActive = uniqueActiveFingers.includes('thumbs');
    const hasActiveFinger = uniqueActiveFingers.length > 0;

    const styles = {
    container: {
        marginTop: isSideMode ? '0' : '24px',
        paddingTop: isSideMode ? '0' : '22px',
        borderTop: isSideMode ? 'none' : '1px solid rgba(203,208,223,0.08)',
        width: isSideMode ? '165px' : '100%',
        overflow: 'visible'
    },
    hint: {
        textAlign: 'center',
        marginBottom: '16px',
        fontSize: '14px',
        color: hasActiveFinger ? '#4895ef' : '#6d7887',
        fontWeight: hasActiveFinger ? 'bold' : 'normal'
    },
    handsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: isSideMode ? '0' : '70px',
        minWidth: isSideMode ? '165px' : '760px',
        width: isSideMode ? '165px' : 'auto',
        overflow: 'visible'
    },
    hand: {
        position: 'relative',
        width: '260px',
        height: '210px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexShrink: 0,
        transform: isSideMode ? 'scale(0.62)' : 'scale(1)',
        transformOrigin: 'center center'
    },
    fingers: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '8px',
        height: '120px',
        zIndex: 2
    },
    finger: {
        width: '42px',
        borderRadius: '24px 24px 18px 18px',
        background: '#6d7887',
        border: '2px solid rgba(203,208,223,0.12)',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'pre-line',
        textAlign: 'center',
        fontSize: '10px',
        lineHeight: '1.15',
        color: '#22272e',
        fontWeight: 'bold',
        transition: 'all 0.18s ease'
    },
    palm: {
        width: '190px',
        height: '92px',
        marginTop: '-8px',
        borderRadius: '38px 38px 48px 48px',
        background: '#6d7887',
        border: '2px solid rgba(203,208,223,0.12)',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#22272e',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 1
    },
    thumb: {
        position: 'absolute',
        bottom: '46px',
        width: '78px',
        height: '36px',
        borderRadius: '24px',
        background: '#6d7887',
        border: '2px solid rgba(203,208,223,0.12)',
        boxShadow: 'none',
        transition: 'all 0.18s ease',
        zIndex: 3
    },
    active: {
        background: highlightColor,
        color: '#22272e',
        borderColor: highlightColor,
        boxShadow: 'none',
        animation: 'fingerGlow 0.9s ease-in-out infinite'
    }
    };

    const renderFinger = (finger) => {
    const isActive = uniqueActiveFingers.includes(finger.id);

    return (
        <div
        key={finger.id}
        title={FINGER_LABELS[finger.id]}
        style={{
            ...styles.finger,
            ...(isActive ? styles.active : {}),
            height: `${finger.height}px`,
            marginTop: `${finger.top}px`,
            transform: `rotate(${finger.rotate}deg) ${isActive ? 'translateY(-8px) scale(1.06)' : ''}`
        }}
        />
    );
    };

    return (
    <div style={styles.container}>
        <style>
        {`
            @keyframes fingerGlow {
            0%, 100% {
                filter: brightness(1);
            }
            50% {
                filter: brightness(1.25);
            }
            }
        `}
        </style>

        <div style={styles.handsWrapper}>
        {showLeftHand && (
        <div style={styles.hand}>
            <div style={styles.fingers}>
            {leftFingers.map(renderFinger)}
            </div>

            <div
            style={{
                ...styles.thumb,
                left: '200px',
                transform: `rotate(-34deg) ${isThumbActive ? 'translateY(-8px) scale(1.06)' : ''}`,
                ...(isThumbActive ? styles.active : {})
            }}
            />

            <div style={styles.palm}></div>
        </div>
        )}

        {showRightHand && (
        <div style={styles.hand}>
            <div style={styles.fingers}>
            {rightFingers.map(renderFinger)}
            </div>

            <div
            style={{
                ...styles.thumb,
                right: '200px',
                transform: `rotate(34deg) ${isThumbActive ? 'translateY(-8px) scale(1.06)' : ''}`,
                ...(isThumbActive ? styles.active : {})
            }}
            />

            <div style={styles.palm}></div>
        </div>
        )}
        </div>
    </div>
    );
    };

    export default HandsGuide;
