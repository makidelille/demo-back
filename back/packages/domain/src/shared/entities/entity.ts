export abstract class Entity<EntityProps> {
    protected readonly props: EntityProps;

    constructor(props: EntityProps){
        this.props = props;
    }

    asDTO(){
        return {
            ...this.props
        };
    }
}