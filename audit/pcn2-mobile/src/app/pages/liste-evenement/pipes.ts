import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {
        //console.log('term', term);
        //console.log(items)
        return term
            ? items.filter(item => item.eventDTO.description.toLowerCase().indexOf(term.toLowerCase()) !== -1)
            : items;
    }
}

@Pipe({
  name: 'filterbystatus',
  pure: false
})
export class FilterByStatusPipe implements PipeTransform {
  transform(items: any[], status): any {
      //console.log('term', term);
      //console.log(items)
      return status
          ? items.filter(item => item.eventDTO.eventStatus.indexOf(status) !== -1)
          : items;
  }
}

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string): any {
        console.log('sortedBy', sortedBy);

        return items.sort((a, b) => { return b[sortedBy] - a[sortedBy] });
    }
}

@Pipe({
	name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

	/**
	 * Transform
	 *
	 * @param value: any
	 * @param args: any
     */
     
	transform(value: any, args?: any): any {
        const valueSub = value.substring(0,1)
		return valueSub;
	}
}

@Pipe({
    name: 'orderBy'
  })
  export class OrderByPipe implements PipeTransform {
    transform = orderBy;
  }

  @Pipe({
    name: 'textContentTruncate'
  })
  export class TruncatePipe implements PipeTransform {
  
    transform(textContent: string, options: TextTruncateOptions): string {
      if (textContent.length >= options.sliceEnd) {
        let truncatedText = textContent.slice(options.sliceStart, options.sliceEnd);
        if (options.prepend) { truncatedText = `${options.prepend}${truncatedText}`; }
        if (options.append) { truncatedText = `${truncatedText}${options.append}`; }
        return truncatedText;
      }
      return textContent;
    }
  
  }
  
  interface TextTruncateOptions {
    sliceStart: number;
    sliceEnd: number;
    prepend?: string;
    append?: string;
  }