/**
 * Row component — 24-column grid row container.
 *
 * @example
 * ```tsx
 * <Row gutter={16}>
 *   <Col span={12}>Left</Col>
 *   <Col span={12}>Right</Col>
 * </Row>
 * ```
 */
export { Row } from "./Row";

/**
 * Col component — grid column occupying a fraction of 24 columns.
 *
 * @example
 * ```tsx
 * <Col span={8}>8/24</Col>
 * <Col xs={24} md={12}>Responsive</Col>
 * ```
 */
export { Col } from "./Col";
export type { RowProps, ColProps, ColSpanType, Breakpoint, Gutter } from "./types";
