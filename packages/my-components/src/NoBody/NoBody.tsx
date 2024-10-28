import React from 'react';
import * as PopoverPrimitives from '@radix-ui/react-popover';

const NoBodyContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitives.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Content>
>(({ children, ...props }, ref) => {
    return (
        <PopoverPrimitives.Portal>
            <PopoverPrimitives.Content ref={ref} {...props}>
                {children}
            </PopoverPrimitives.Content>
        </PopoverPrimitives.Portal>
    );
});
NoBodyContent.displayName = 'NoBodyContent';

export default Object.assign(PopoverPrimitives.Root, PopoverPrimitives, {
    Content: NoBodyContent,
});
