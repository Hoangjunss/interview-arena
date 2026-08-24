---
id: testing-vue-components-voi-vitest-va-vue-test-utils
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Testing Vue components với Vitest và Vue Test Utils?

## Question (EN)
Testing Vue components with Vitest and Vue Test Utils?

## Đáp án chi tiết (VI)
Vue components được test bằng cách mount chúng với `@vue/test-utils` và assert trên rendered output và emitted events, dùng Vitest làm test runner.\
```javascript\
import { mount } from '@vue/test-utils'\
import { describe, it, expect } from 'vitest'\
import Counter from './Counter.vue'\
\
describe('Counter', () =\u003e {\
  it('increments when button clicked', async () =\u003e {\
    const wrapper = mount(Counter, {\
      props: { initialCount: 0 }\
    })\
\
    await wrapper.find('button').trigger('click')\
\
    expect(wrapper.text()).toContain('1')\
    expect(wrapper.emitted('update')).toBeTruthy()\
  })\
\
  it('renders slot content', () =\u003e {\
    const wrapper = mount(Counter, {\
      slots: { default: '\u003cspan\u003eLabel\u003c/span\u003e' }\
    })\
    expect(wrapper.find('span').exists()).toBe(true)\
  })\
})\
```\
Dùng `shallowMount` để stub child components. Test behavior, không test implementation details.

## Detailed Answer (EN)
```javascript\
import { mount } from '@vue/test-utils'\
import { describe, it, expect } from 'vitest'\
import Counter from './Counter.vue'\
\
describe('Counter', () =\u003e {\
  it('increments when button clicked', async () =\u003e {\
    const wrapper = mount(Counter, {\
      props: { initialCount: 0 }\
    })\
\
    await wrapper.find('button').trigger('click')\
\
    expect(wrapper.text()).toContain('1')\
    expect(wrapper.emitted('update')).toBeTruthy()\
  })\
\
  it('renders slot content', () =\u003e {\
    const wrapper = mount(Counter, {\
      slots: { default: '\u003cspan\u003eLabel\u003c/span\u003e' }\
    })\
    expect(wrapper.find('span').exists()).toBe(true)\
  })\
})\
```\
Use `shallowMount` to stub child components. Test behavior, not implementation details.
